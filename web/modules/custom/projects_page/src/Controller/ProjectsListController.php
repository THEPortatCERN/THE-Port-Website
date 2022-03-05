<?php

namespace Drupal\projects_page\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProjectsListController extends ControllerBase {

  public function content() {
    return [
      '#markup' => '<div id="app"></div>',
      '#attached' => [
        'library' => [
          'projects_page/dist',
        ],
      ],
    ];
  }

  public function json() {
    /** @type EntityStorageInterface */
    $storage = $this->entityTypeManager()->getStorage('node');
    $query = $storage->getQuery();

    $query
      ->condition('type', 'project')
      ->condition('status', TRUE);
    $ids = $query->execute();

    $nodes = $storage->loadMultiple($ids);

    $data = [];
    /** @var \Drupal\node\NodeInterface $node */
    foreach ($nodes as $node) {

      /** \Drupal\Core\Field\FieldItemListInterface $field_summary */
      $field_summary = $node->get('field_summary');
      $summary = $field_summary->getValue()[0]['value'];

      /** \Drupal\Core\Field\FieldItemListInterface $field_hero */
      // $field_hero = $node->get('field_hero');
      // $hero = $field_hero->getValue();

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
        // 'hero' => $hero,
        'attributes' => $attributes,
        'events' => $events,
        'sdgs' => $sdgs,
      ]);
    }


    return new JsonResponse($data);
  }
}
