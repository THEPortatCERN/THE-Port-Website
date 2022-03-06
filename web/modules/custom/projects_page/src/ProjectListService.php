<?php

namespace Drupal\projects_page;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;

class ProjectListService {

  /** @var \Drupal\Core\File\FileUrlGeneratorInterface */
  protected $file_url_generator;

  /** @var Drupal\Core\Entity\EntityTypeManagerInterface */
  protected $entity_type_manager;

  public function __construct(EntityTypeManagerInterface $entity_type_manager, FileUrlGeneratorInterface $file_url_generator) {
    $this->entity_type_manager = $entity_type_manager;
    $this->file_url_generator = $file_url_generator;
  }

  public function getTeaserData() {
    $nodes = $this->entity_type_manager
      ->getStorage('node')
      ->loadByProperties([
        'type' => 'project',
        'status' => 1,
      ]);

    $data = [];
    /** @var \Drupal\node\NodeInterface $node */
    foreach ($nodes as $node) {

      /** @var \Drupal\Core\Field\EntityReferenceFieldItemListInterface $field_teams */
      $field_teams = $node->get('field_teams');
      $teams = [];
      /** @var Drupal\taxonomy\Entity\Term $term */
      foreach ($field_teams->referencedEntities() as $term) {
        array_push($teams, $term->getName());
      }

      /** @var \Drupal\Core\Field\FieldItemListInterface $field_summary */
      $field_summary = $node->get('field_summary');
      $summary = $field_summary->getValue()[0]['value'];

      $image_url = '';
      if (!empty($node->get('field_hero')->entity)) {
        $image_uri = $node->get('field_hero')->entity->field_media_image->entity->getFileUri();
        $image_url = $this->file_url_generator->generateString($image_uri);
      } elseif (!empty($node->get('field_drawing')->entity)) {
        $image_uri = $node->get('field_drawing')->entity->field_media_image->entity->getFileUri();
        $image_url = $this->file_url_generator->generateString($image_uri);
      }

      /** @var \Drupal\Core\Field\EntityReferenceFieldItemListInterface $field_attributes */
      $field_attributes = $node->get('field_attributes');
      $attributes = [];
      /** @var Drupal\taxonomy\Entity\Term $term */
      foreach ($field_attributes->referencedEntities() as $term) {
        array_push($attributes, $term->getName());
      }

      /** @var \Drupal\Core\Field\EntityReferenceFieldItemListInterface $field_events */
      $field_events = $node->get('field_events');
      $events = [];
      /** @var Drupal\taxonomy\Entity\Term $term */
      foreach ($field_events->referencedEntities() as $term) {
        array_push($events, $term->getName());
      }

      /** @var \Drupal\Core\Field\EntityReferenceFieldItemListInterface $field_events */
      $field_development_goals = $node->get('field_development_goals');
      $sdgs = [];
      /** @var Drupal\taxonomy\Entity\Term $field_development_goals */
      foreach ($field_development_goals->referencedEntities() as $term) {
        array_push($sdgs, $term->getName());
      }

      array_push($data, [
        'title' => $node->getTitle(),
        'summary' => $summary,
        'page_url' => $node->toUrl()->toString(),
        'image_url' => $image_url,
        'teams' => $teams,
        'attributes' => $attributes,
        'events' => $events,
        'sdgs' => $sdgs,
      ]);
    }

    return $data;
  }
}
